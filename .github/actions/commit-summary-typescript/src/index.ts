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
    const preTag = await execute('/bin/bash -c "git tag --sort=-creatordate | sed -n 2p"')
    const summary = await execute(`git log --oneline --pretty=tformat:"%h %s" ${preTag.trim()}..${newTag}`)
    core.setOutput("summary", summary)
  } catch (error) {
    core.setFailed(error.message)
  }
}
main()