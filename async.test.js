const axios = require('axios');

async function fetchData(id) {
	return await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
}

describe('tests for async functions', () => {
	it('should return correct todo ver1', async () => {
		const { data } = await fetchData(1);
		expect(data.id).toBe(1);
	});

	it('should return correct todo ver2', () => {
		return fetchData(1).then((todo) => {
			expect(todo.data.id).toBe(1);
		});
	});
});
