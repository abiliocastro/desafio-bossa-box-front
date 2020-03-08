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
      <v-card-actions class="d-flex justify-end">
        <v-icon @click="editFerramenta(ferramenta)">{{ icons.mdiPencil }}</v-icon>
        <v-icon @click="removeFerramenta(ferramenta._id)">{{ icons.mdiDelete }}</v-icon>
      </v-card-actions>
    </v-card>
    <v-btn
      fab
      bottom
      right
      fixed
      @click="dialogAdd = true"
    >
      <v-icon>{{ icons.mdiPlus }}</v-icon>
    </v-btn>
    <v-dialog v-model="dialogAdd" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Tool</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Title*" v-model="addForm.title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="Description*" v-model="addForm.description" hint="Tool description" required></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Link*" v-model="addForm.link" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="tagToAdd" placeholder="Add tag">
                  <v-btn text slot="append" @click="addTagAdd()">Add Tag</v-btn>
                </v-text-field>
              </v-col>
            </v-row>
             <div class="d-flex flex-wrap">
                <v-chip close class="ma-1" v-for="(tag, tindex) in addForm.tags" :key="tindex" @click:close="removeTagAdd(tag)">
                  {{tag}}
                </v-chip>
              </div>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogAdd = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addFerramenta(addForm)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Tool</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Title*" v-model="editForm.title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="Description*" v-model="editForm.description" hint="Tool description" required></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Link*" v-model="editForm.link" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="tagToAdd" placeholder="Add tag">
                  <v-btn text slot="append" @click="addTagEdit()">Add Tag</v-btn>
                </v-text-field>
              </v-col>
            </v-row>
             <div class="d-flex flex-wrap">
                <v-chip close class="ma-1" v-for="(tag, tindex) in editForm.tags" :key="tindex" @click:close="removeTagEdit(tag)">
                  {{tag}}
                </v-chip>
              </div>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="updateFerramenta(editForm)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from '../services/api';
import { mdiPencil, mdiDelete, mdiPlus } from '@mdi/js'
export default {
  data: () => ({
      ferramentas: [],   
      addForm: {
        title: '',
        description: '',
        link: '',
        tags: []
      },
      editForm: {
        id: '',
        title: '',
        description: '',
        link: '',
        tags: []
      },
      tagToAdd: '',
      icons: {
        mdiPencil,
        mdiDelete,
        mdiPlus
      },
      dialog: false,
      dialogAdd: false
  }),
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
    addFerramenta(payload){
     const path = '/tools';     
       api.post(path,payload) .then(() => {
          this.getFerramentas();
          this.dialogAdd = false;
        }).catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getFerramentas();
          this.dialogAdd = false;
        });
    },
    initForm() {
      this.addForm.title = '';
      this.addForm.description = '';
      this.addForm.link = '';
      this.addForm.tags = [];

      this.editForm.id = '';
      this.editForm.title = '';
      this.editForm.description = '';
      this.editForm.link = '';
      this.editForm.tags = [];

      this.tagToAdd = '';
    },
    updateFerramenta(tool) {
    const path = '/tools';
    var body = {
      "id": tool._id,
      "tool": tool
    }
      api.put(path, body)
      .then(() => {
        this.getFerramentas();
        this.dialog = false;
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(error);
        this.getFerramentas();
        this.dialog = false;
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
    removeFerramenta(idFerramenta) {
      api.delete(`/tools/${idFerramenta}`)
        .then(() => {
          this.getFerramentas();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getFerramentas();
        });
    },
    onDeleteContato(contato) {
      this.removeContato(contato.id);
    },
    editFerramenta(ferramenta) {
      this.editForm = JSON.parse(JSON.stringify(ferramenta));
      this.dialog = true;
    },
    addTagEdit() {
      if(this.tagToAdd)
        this.editForm.tags.push(this.tagToAdd);
    },
    addTagAdd() {
      if(this.tagToAdd)
        this.addForm.tags.push(this.tagToAdd);
    },
    removeTagAdd(tag) {
      this.addForm.tags.splice(this.editForm.tags.indexOf(tag), 1)
    },
    removeTagEdit(tag) {
      this.editForm.tags.splice(this.editForm.tags.indexOf(tag), 1)
    }
  },
  created() {
    this.getFerramentas();
  }
};
</script>