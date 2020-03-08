# nodejs-spawn-test-example
nodejs spawn test with mocha,chai,sinon

## sinon stub
### shuold error force
```js
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
```

### shuold close force not 0 code
```js
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
```
