import { expect } from "chai";
import { Spawn } from "../../src/Spawn";
import * as sinon from "sinon";
import * as child_process from 'child_process';
import { EventEmitter } from 'events';
import { ChildProcess } from "child_process";

export default function () {
  describe('spawn', () => {

    it('shuold close', async () => {
      const spawnClass = new Spawn();
      const result = await spawnClass.spawnAsPromise('cmd', ['/c', 'dir']);
      expect(result).to.be.equals(0);
    });

    it('shuold error', async () => {
      const spawnClass = new Spawn();
      try {
        const result = await spawnClass.spawnAsPromise('foo', ['-l']);
        expect(result).to.be.equals(999);
      } catch (err) {
        expect(err).a('error')
        expect(err.message).equals('spawn foo ENOENT', 'error:message')
      }
    });

    it('shuold error force', async () => {
      let spawnEvent: ChildProcess = <ChildProcess>new EventEmitter();
      sinon.stub(child_process, 'spawn').returns(spawnEvent);
      try {
        const spawnClass = new Spawn();
        const spawnAsPromise = spawnClass.spawnAsPromise('cmd', ['/c', 'dir']);
        spawnEvent.emit('error', new Error('emit error!'));
        const result = await spawnAsPromise;
        expect(result).to.be.equals('why not throw error?!');
      } catch (err) {
        expect(err).a('error')
        expect(err.message).equals('emit error!', 'error:message')
      } finally {
        sinon.restore();
      }
    });

    it('shuold close force not 0 code', async () => {
      let spawnEvent: ChildProcess = <ChildProcess>new EventEmitter();
      sinon.stub(child_process, 'spawn').returns(spawnEvent);
      try {
        const spawnClass = new Spawn();
        const spawnAsPromise = spawnClass.spawnAsPromise('cmd', ['/c', 'dir']);
        spawnEvent.emit('close', 2);
        const result = await spawnAsPromise;
        expect(result).to.be.equals('why not throw error?!');
      } catch (err) {
        expect(err).a('error')
        expect(err.message).equals('code is not 0, code : 2', 'error:message')
      } finally {
        sinon.restore();
      }
    });
  })
}
