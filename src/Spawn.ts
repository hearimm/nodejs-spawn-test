import * as child_process from 'child_process';
import { ChildProcess, SpawnOptions } from 'child_process';
export class Spawn {

  spawnAsPromise(cmd: string, args?: any): Promise<any> {
    const proc: ChildProcess = child_process.spawn(cmd, args)

    return new Promise((resolve, reject) => {
      proc.on('close', (code, signal) => {
        if (code === 0) {
          resolve(code)
        } else {
          reject(new Error('code is not 0, code : ' + code))
        }
      })
      proc.on('error', (err) => {
        reject(err)
      })
    });
  }

}
