Vue.use(VeeValidate);
var App = new Vue({
    el: '#container',
    data: {
        id: 0,
        name: '',
        lastName: '',
        phone: '',
        contacts: [{
                id: 1,
                name: 'Delcio',
                lastName: 'Polanco',
                phone: '8099613034'
            },
            {
                id: 2,
                name: 'Fulano de',
                lastName: 'Tal',
                phone: '8099613035'
            },
            {
                id: 1,
                name: 'Delcio',
                lastName: 'Polanco',
                phone: '8099613034'
            },
            {
                id: 2,
                name: 'Fulano de',
                lastName: 'Tal',
                phone: '8099613035'
            },
            {
                id: 1,
                name: 'Delcio',
                lastName: 'Polanco',
                phone: '8099613034'
            },
            {
                id: 2,
                name: 'Fulano de',
                lastName: 'Tal',
                phone: '8099613035'
            },
            {
                id: 1,
                name: 'Delcio',
                lastName: 'Polanco',
                phone: '8099613034'
            },
            {
                id: 2,
                name: 'Fulano de',
                lastName: 'Tal',
                phone: '8099613035'
            }
        ]
    },
    mounted: function () {
        var dict = {
            en: {
                custom: {
                    name: {
                        required: '* Requerido.'
                    },
                    lastName: {
                        required: '* Requerido.'
                    },
                    phone: {
                        required: '* Requerido.',
                        min: '* Debe introducir al menos 10 números.',
                        numeric: '* Debe ser númerico.'
                    }
                }
            }
        };
        this.$validator.updateDictionary(dict);
    },
    watch: {
        contacts: function () {
            this.clean();
        }
    },
    methods: {
        saveContact: function () {
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.showMessage({
                        text: '¿Estas seguro de querer guardar este contacto?',
                    }, this.add);
                    return;
                }
            });
        },
        updateContact: function () {
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.showMessage({
                        text: '¿Estas seguro de querer actualizar este contacto?',
                        confirmButtonColor: '#337ab7'
                    }, this.update);
                    return;
                }
            });
        },
        deleteContact: function (contact) {
            this.id = contact.id;
            this.showMessage({
                text: '¿Estas seguro de querer eliminar este contacto?',
                confirmButtonColor: '#d9534f'
            }, this.delete);
        },
        getContactIndexById: function (id) {
            return this.contacts.filter(function (val, index) {
                val.index = index;
                return val.id === id;
            })[0].index;
        },
        showMessage: function (message, fn) {
            var message = {
                title: ' ',
                text: message.text,
                type: message.type || 'warning',
                showCancelButton: message.showCancelButton || true,
                closeOnConfirm: message.closeOnConfirm || true,
                confirmButtonText: message.confirmButtonText || 'Si',
                cancelButtonText: message.cancelButtonText || 'No',
                confirmButtonColor: message.confirmButtonColor || '#5cb85c'
            };
            swal(message, fn);
        },
        update: function () {
            var index = this.getContactIndexById(this.id);

            this.contacts.splice(index, 1);
            this.contacts.splice(index, 0, {
                id: this.id,
                name: this.name,
                lastName: this.lastName,
                phone: this.phone
            });
        },
        add: function () {
            this.contacts.push({
                id: this.contacts.length + 1,
                name: this.name,
                lastName: this.lastName,
                phone: this.phone,
            });
        },
        edit: function (contact) {
            this.id = contact.id;
            this.name = contact.name;
            this.lastName = contact.lastName;
            this.phone = contact.phone;
        },
        delete: function () {
            var index = this.getContactIndexById(this.id);
            this.contacts.splice(index, 1);
        },
        clean: function () {
            this.id = '';
            this.name = '';
            this.lastName = '';
            this.phone = '';
            this.$validator.clean();
        }
    }
});