<template>
  <div class="d-flex flex-wrap pt-4 pl-4">
    <v-card
      class="mr-4 mb-4 pa-4"
      max-width="344"
      v-for="(ferramenta, index) in ferramentas" :key="index">
      <div class="title">{{ ferramenta.title }}</div>
      <p>{{ ferramenta.description }}</p>
      <a :href="ferramenta.link">{{ ferramenta.link}}</a>
      <div class="d-flex flex-wrap">
        <v-chip class="ma-1" v-for="(tag, tindex) in ferramenta.tags" :key="tindex">
          {{tag}}
        </v-chip>
      </div>
    </v-card>
  </div>
</template>

<script>
import api from '../services/api';
export default {
  data() {
    return {
      ferramentas: [],   
      addContactForm: {
        nome: '',
        telefone: '',
      },
      editForm: {
        id: '',
        nome: '',
        telefone: '',
      },
    };
  },
  methods: {
    getFerramentas() {
      api.get('/tools')
        .then((res) => {
          this.ferramentas = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    addContato(payload){
     const path = '/contato';     
       api.post(path,payload) .then(() => {
          this.getContatos();
        }).catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getContatos();
        });
    },
    initForm() {
      this.addContactForm.nome = '';
      this.addContactForm.telefone = '';
      this.editForm.id = '';
      this.editForm.nome = '';
      this.editForm.telefone = '';
    },
    updateContact(payload, contactID) {
    const path = `/contato/${contactID}`;
      api.put(path, payload)
      .then(() => {
        this.getContatos();
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(error);
        this.getContatos();
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addContactModal.hide();
      const payload = {
        nome: this.addContactForm.nome,
        telefone: this.addContactForm.telefone,
        
      };
      this.addContato(payload);
      this.initForm();
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editContactModal.hide();
      const payload = {
      nome: this.editForm.nome,
      telefone: this.editForm.telefone,
     };
     this.updateContact(payload, this.editForm.id);
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addContactModal.hide();
      this.initForm();
    },
    removeContato(idContato) {
      api.delete(`/contato/${idContato}`)
        .then(() => {
          this.getContatos();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getContatos();
        });
    },
    onDeleteContato(contato) {
      this.removeContato(contato.id);
    },
    editContact(contato) {
      this.editForm = contato ;
    }
  },
  created() {
    this.getFerramentas();
   }
};
</script>