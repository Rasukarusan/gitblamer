import * as core from '@actions/core'
import * as exec from '@actions/exec'

const exec_command = async (command: string) => {
  return await exec.exec(command);
}

try {
  const newTag = core.getInput('ref');
  console.log(`new_tag: ${newTag} !`);

  const preTag = exec_command('git tag --sort=-creatordate | sed -n 2p')
  console.log(`pre_tag: ${preTag} !`);

  const summary = exec_command(`git log --oneline --pretty=tformat:"%h %s" ${preTag}..${newTag}`)
  console.log(summary);

  core.setOutput("summary", 'this is summary!!');
} catch (error) {
  core.setFailed(error.message);
}