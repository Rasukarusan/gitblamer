import * as core from '@actions/core'
import * as exec from '@actions/exec'

const exec_command = async () => {
  await exec.exec('ls');
  await exec.exec('which git');
  // do smt with bar
};

try {
  // `who-to-greet` input defined in action metadata file
  const newTag = core.getInput('ref');
  console.log(`new_tag: ${newTag} !`);
  exec_command()
  core.setOutput("summary", 'this is summary!!');

} catch (error) {
  core.setFailed(error.message);
}