import * as core from '@actions/core'
import * as exec from '@actions/exec'
import { ExecOptions } from '@actions/exec'

const exec_command = async (command: string) => {
  let output = '';
  let error = '';

  const options: ExecOptions = {};
  options.listeners = {
    stdout: (data: Buffer) => {
      output += data.toString();
    },
    stderr: (data: Buffer) => {
      error += data.toString();
    }
  };
  await exec.exec(command, null, options);
  return { output, error }

}

const main = async () => {
  try {
    const newTag = core.getInput('ref');
    console.log(`new_tag: ${newTag} !`);

    const preTag = await exec_command('git tag --sort=-creatordate')
    console.log(preTag);
    console.log(`pre_tag: ${preTag} !`);

    const pre = await exec.exec('git tag --sort=-creatordate')
    console.log(pre);

    const summary2 = await exec.exec(`git log --oneline --pretty=tformat:"%h %s" v1.2.0..v1.2.5`)
    console.log(summary2);

    const summary = await exec.exec(`git log --oneline --pretty=tformat:"%h %s" ${preTag}..${newTag}`)
    console.log(summary);

    core.setOutput("summary", 'this is summary!!');
  } catch (error) {
    core.setFailed(error.message);
  }
}
main()