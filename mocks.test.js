const axios = require('axios');
const fetchData = require('./async.test');

function forEach(items, callback) {
	for (let i = 0; i < items.length; i++) {
		callback(items[i]);
	}
}

describe('testing mock data', () => {
	it('mock callback', () => {
		const mockCallback = jest.fn((x) => 42 + x);
		forEach([0, 2], mockCallback);
		expect(mockCallback.mock.calls.length).toBe(2);
		expect(mockCallback.mock.calls[0][0]).toBe(0);
		expect(mockCallback.mock.calls[1][0]).toBe(2);
		expect(mockCallback.mock.results[0].value).toBe(42);
		expect(mockCallback.mock.results[1].value).toBe(44);
	});

	it('mock return', () => {
		const mock = jest.fn();
		mock.mockReturnValueOnce(true).mockReturnValueOnce(false).mockReturnValueOnce('hello');
		const results1 = mock();
		const results2 = mock();
		const results3 = mock();
		expect(results1).toBe(true);
		expect(results2).toBe(false);
		expect(results3).toBe('hello');
	});

	it('mock axios', async () => {
		jest.spyOn(axios, 'get').mockReturnValueOnce({
			results: {
				id: 2,
				message: 'Hello I am Dug!',
			},
		});
		const { results } = await fetchData(2);
		expect(results.message).toBe('Hello I am Dug!');
	});
});
