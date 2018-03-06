import fs from 'fs';
import path from 'path';
const FormStream = require('formstream');
const Base = require('../base.js');

/**
 * 文件提交类型接口
 * @type {{}}
 */
module.exports = class extends Base {

    async imageAction() {
        try {
            let file = this.ctx.file('file');
            let protocol = this.ctx.protocol || 'https';
            let fileStream = fs.createReadStream(file.path);
            let form = new FormStream();
            form.stream('file',fileStream, file.name);

            let options = {
                method: 'POST',
                headers: form.headers(),
                body: form,
                dataType: 'json',
            };
            
            let img_upload_url = this.ctx.config('img_upload_url');

            let result = await this.fetch(protocol + ':' + img_upload_url, options).then(res => res.json());

            if(result && result.sucess) {
                this.body = {
                    errorCode: 9000,
                    ...result,
                };
            } else {
                this.body = {
                    errorCode: 5000,
                    ...result,
                };
            }

        } catch(err) {
        	console.info('image upload err', err);
            this.body = {
                errorCode: 5000,
                errorMessage: '图片上传出错啦',
            };
        }
    }

    async imageBase64Action() {

        try {

            let data = this.ctx.post('data');

            let protocol = this.ctx.protocol || 'https';

            let dataArr = data.split(',');

            let img_param = dataArr[0];
            let img_data = dataArr[1];

            let fileName = think.uuid('v4') + '-file.jpg';

            let tempFilePath = path.join(__dirname + '/temp/', fileName);

            if(!think.isExist(path.dirname(tempFilePath))) {
                think.mkdir(path.dirname(tempFilePath));
            }

            // base64保存为临时文件
            fs.writeFileSync(tempFilePath, new Buffer(img_data, 'base64'));

            let fileStream = fs.createReadStream(tempFilePath);

            let form = new FormStream();
            form.stream('file',fileStream, "file.jpg");

            let options = {
                method: 'POST',
                headers: form.headers(),
                body: form,
                dataType: 'json',
            };
            
            let img_upload_url = this.ctx.config('img_upload_url');
            
            let result = await this.fetch(protocol + ':' + img_upload_url, options).then(res => res.json());

            if(result && result.sucess) {
                this.body = {
                    errorCode: 9000,
                    ...result,
            };
            } else {
                this.body = {
                    errorCode: 5000,
                    ...result,
                };
            }
        } catch(err) {
            console.info('err', err);
            this.body = {
                errorCode: 5000,
                errorMessage: '图片上传出错啦',
            };
        }
    }

    async fileAction() {
        try {
            let file = this.ctx.file('file');

            let fileStream = fs.createReadStream(file.path);
            let form = new FormStream();
            form.stream('file',fileStream, file.name);

            let options = {
                method: 'POST',
                headers: form.headers(),
                body: form,
                dataType: 'json',
            };
            
            let file_upload_url = this.ctx.config('file_upload_url');

            let result = await this.fetch(file_upload_url, options).then(res => res.json());

            if(result && result.data) {
                result.data.fileName = result.data.fileName || '';
            }

            this.body = result;

        } catch(err) {
            console.error('fileAction', err);
            this.body = {
                errorCode: 5000,
                errorMessage: '音乐上传出错啦',
            };
        }
    }

    async downloadAction() {
        try {
            let service = this.ctx.query.service;
            let proxy_url = this.ctx.config('proxy_url');
            this.ctx.redirect(proxy_url + service);
        } catch(err) {
            this.body = {
                errorCode: 5000,
                errorMessage: '下载文件出错啦',
            };
        }
    }

    async imageProxyAction() {

        try {

            let src = this.ctx.query.src;
            let res = await this.fetch(src);

            let res_headers = res.headers._headers;
            let content_type = res_headers['content-type'];
            this.ctx.type = content_type && content_type[0];
            this.body = res.body;
        } catch(err) {
            this.body = {
                errorCode: 5000,
                errorMessage: '图片上传出错啦',
            };
        }
    }
};
