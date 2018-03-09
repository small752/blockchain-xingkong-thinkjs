module.exports = class extends think.Model {

    get schema() {
        return {
            id: { // 字段名称
                type: 'varchar(50)',
                primary: true,
                autoIncrement: true,
            },
            title: {
                type: 'varchar(125)'
            },
            intro: {
                type: 'varchar(125)'
            },
            link: {
                type: 'varchar(255)'
            },
            pid: {
                type: 'varchar(50)'
            }
        }
    }
}
