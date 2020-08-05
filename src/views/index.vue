<template>
  <div class="container fluid">
    <br />
    <div>
      <div class="card">
        <div class="card-header">
          รายการ
          <b-button v-b-toggle="'form'" class="m-1" variant="outline-primary"
            >create</b-button
          >
          <!-- Element to collapse -->
          <b-collapse id="form" class="mt-3">
            <b-form @submit="onSubmit" inline>
              <b-input-group prepend="name" class="mb-2 mr-sm-2 mb-sm-0">
                <b-input
                  v-model="form.name"
                  id="inline-form-input-name"
                ></b-input>
              </b-input-group>

              <b-input-group prepend="age" class="mb-2 mr-sm-2 mb-sm-0">
                <b-input
                  v-model="form.age"
                  id="inline-form-input-age"
                ></b-input>
              </b-input-group>

              <b-input-group prepend="aka" class="mb-2 mr-sm-2 mb-sm-0">
                <b-input
                  v-model="form.aka"
                  id="inline-form-input-aka"
                ></b-input>
              </b-input-group>

              <b-button type="submit" variant="primary" class="ml-4"
                >Add</b-button
              >
            </b-form>
          </b-collapse>
        </div>
        <div class="card-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>name</th>
                <th>age</th>
                <th>aka</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in $store.getters.forms" :key="index">
                <td>{{ index + 1 }}</td>
                <td v-if="index != editindex">{{ item.name }}</td>
                <td v-if="index != editindex">{{ item.age }}</td>
                <td v-if="index != editindex">{{ item.aka }}</td>
                <td v-if="index != editindex">
                  <b-button
                    variant="outline-warning"
                    class="mr-2"
                    v-on:click="openEdit(index, item)"
                    >edit</b-button
                  >
                  <b-button
                    v-on:click="deleteForm(item._id)"
                    variant="outline-danger"
                    >delete</b-button
                  >
                </td>
                <td v-if="index == editindex">
                  <b-form-input
                    type="text"
                    :value="item.name"
                    v-model="form.name"
                  />
                </td>
                <td v-if="index == editindex">
                  <b-form-input
                    type="text"
                    :value="item.age"
                    v-model="form.age"
                  />
                </td>
                <td v-if="index == editindex">
                  <b-form-input
                    type="text"
                    :value="item.aka"
                    v-model="form.aka"
                  />
                </td>
                <td v-if="index == editindex">
                  <b-button
                    variant="outline-primary"
                    class="mr-2"
                    v-on:click="editForm(item._id)"
                    >save</b-button
                  >
                  <b-button v-on:click="closeEdit()" variant="outline-danger"
                    >cancel</b-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editindex: -1,
      form: {
        name: "",
        age: "",
        aka: ""
      }
    };
  },
  created() {
    this.fetchForm();
  },
  updated() {
    this.fetchForm();
  },
  methods: {
    fetchForm() {
      this.$store.dispatch("fetchForm");
    },
    onSubmit(evt) {
      evt.preventDefault();
      let payload = {
        name: this.form.name,
        age: this.form.age,
        aka: this.form.aka
      };
      this.$store.dispatch("addForm", payload);
    },
    deleteForm(id) {
      let payload = {
        _id: id
      };
      this.$store.dispatch("deleteForm", payload);
    },
    openEdit(index, item) {
      this.editindex = index;
      this.form.name = item.name;
      this.form.aka = item.aka;
      this.form.age = item.age;
    },
    closeEdit() {
      this.editindex = -1;
      this.form.name = "";
      this.form.aka = "";
      this.form.age = "";
    },
    editForm(id) {
      let payload = {
        _id: id,
        name: this.form.name,
        age: this.form.age,
        aka: this.form.aka
      };
      this.$store.dispatch("editForm", payload).then(this.closeEdit());
    }
  }
};
</script>
