'use strict';

const http = require('http');
const tap = require('tap');

const Mirror = require('simples/lib/mirror');
const Server = require('simples/lib/server');
const ServerUtils = require('simples/lib/utils/server-utils');
const TestUtils = require('simples/test/test-utils');

TestUtils.mockHTTPServer();

tap.test('Mirror.prototype.start()', (test) => {

	const mirror = Mirror.create(Server.create());

	const result = mirror.start((m) => {
		test.equal(m, mirror);

		test.end();
	});

	test.equal(result, mirror);
});

tap.test('Mirror.prototype.stop()', (test) => {

	const mirror = Mirror.create(Server.create());

	const result = mirror.stop((m) => {
		test.equal(m, mirror);
		test.end();
	});

	test.equal(result, mirror);
});

tap.test('Mirror.create()', (test) => {

	const server = Server.create();
	const mirror = Mirror.create(server);
	const serverMeta = ServerUtils.getServerMeta(server);
	const mirrorMeta = ServerUtils.getServerMeta(mirror);

	test.ok(mirror instanceof Mirror);
	test.match(mirror, {
		data: {}
	});
	test.match(mirrorMeta, {
		backlog: null,
		busy: true,
		hostname: '',
		https: null,
		instance: http.Server,
		port: 80,
		requestListener: serverMeta.requestListener,
		started: true,
		upgradeListener: serverMeta.upgradeListener
	});

	test.end();
});