import qs from 'qs';
import fs from 'fs';
import FormStream from 'formstream';
import FormData from 'form-data';

module.exports = class extends think.Controller {
	__before() {

	}

	_postForm(server, path, data = {}) {
			
		const dingding_server_url = think.config('dingding_server_url');
		
			const params = new FormData();
			Object.keys(data).forEach(function(k) {
				params.append(k, data[k]);
			});
			
			let options = {
				method: 'POST',
				headers: {},
				body: params,
				dataType: 'json',
			};
			
			return this.fetch(dingding_server_url + path, options)
	}
	
	_postJson(server, path, data = {}) {
		
		const dingding_server_url = think.config('dingding_server_url');
		const params = new FormData();
		Object.keys(data).forEach(function(k) {
			params.append(k, data[k]);
		});
		
		let options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
			dataType: 'json',
		};
		return this.fetch(dingding_server_url + path, options)
	}
};