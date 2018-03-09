const Base = require('../base.js');

/**
 * 运营后台
 * @type {{}}
 */
module.exports = class extends Base {

    /**
     * PC端界面
     * @type {{}}
     */
    async pageAction() {
        return this.display('manager/index');
    }

    async linkFormAction() {
        try {

            let link_obj = {
                link_title: '区块链',
                link_intro: '介绍区块链',
                link_link: 'http://www.baidu.com',
            };

            // 实例化，没有任何参数
            let linkService = think.service('manager/home/link', {...link_obj});

            let result = await linkService.createOrUpdate();

            if(result && result.errorCode == 9000) {

            }

            this.body = {
                errorCode: 9000,
                errorMessage: '保持成功'
            };
        } catch(err) {

            this.body = {
                errorCode: 5000,
                errorMessage: '服务器开小差了',
            };
        }
    }
};
