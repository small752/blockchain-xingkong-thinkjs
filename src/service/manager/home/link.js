module.exports = class extends think.Service {

    constructor(link_obj) {
        super();
        this.link_id = link_obj.id;
        this.link_title = link_obj.link_title;
        this.link_intro = link_obj.link_intro;
        this.link_link = link_obj.link_link;
        this.link_pid = link_obj.link_pid;
    }

    async createOrUpdate() {

        try {
            let result = {};
            let homeLink = this.model('manager/home/home_link');

            let insertId = await homeLink.add({
                id: think.uuid(),
                title: this.link_title,
                intro: this.link_intro,
                link: this.link_link,
            });

            result.errorCode = 9000;

            return result;
        } catch(err) {
            console.info('login service err', err);
            this.body = {
                errorCode: 5000,
                errorMessage: '服务器开小差了222',
            };
        }

    }
}
