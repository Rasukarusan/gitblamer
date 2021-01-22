import * as core from '@actions/core'
import * as exec from '@actions/exec'
import { ExecOptions } from '@actions/exec'

const execute = async (command: string): Promise<string> => {
  let output = ''
  const options: ExecOptions = {}
  options.listeners = {
    stdout: (data: Buffer) => {
      output += data.toString()
    },
    stderr: (data: Buffer) => {
      console.error(data)
    }
  }
  await exec.exec(command, null, options)
  return output

}

const main = async () => {
  try {
    const newTag = core.getInput('ref')
    console.log(`new_tag: ${newTag} !`)

    const preTag = await execute('/bin/bash -c "git tag --sort=-creatordate | sed -n 2p"')
    console.log(preTag)
    console.log(`pre_tag: ${preTag} !`)


    const summary2 = await execute(`git log --oneline --pretty=tformat:"%h %s" v1.2.0..v1.2.5`)
    console.log(summary2)

    const summary = await execute(`git log --oneline --pretty=tformat:"%h %s" ${preTag}..${newTag}`)
    console.log(summary)

    core.setOutput("summary", summary)
  } catch (error) {
    core.setFailed(error.message)
  }
}
main()