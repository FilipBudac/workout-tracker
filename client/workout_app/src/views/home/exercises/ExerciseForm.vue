<template>
  <div>
    <div class="w-75 m-5 mx-auto text-left">
      <b-button v-b-toggle.collapse-1 align="left" class="w-50 mx-auto" variant="info">Add Exercise</b-button>
    </div>

    <b-collapse id="collapse-1" class="w-75 m-5 mx-auto">
      <b-card header="Add Exercise" bg-variant="light" class="w-75">

        <b-form>
          <b-row class="ml-auto">
            <b-col>
              <!--  NAME  -->
              <b-form-input
                  placeholder="Enter exercise name..."
                  id="inline-form-input-name"
                  class="mb-2 mr-sm-2 mb-sm-3 w-100 label-align-md"
              ></b-form-input>
            </b-col>

            <b-col align="left">
              <!--  CATEGORY  -->
              <b-form-select class="mb-2 mr-sm-2 mb-sm-0 ml-3" align-left>
                <b-form-select-option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                >
                  {{category.name}}
                </b-form-select-option>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <!--  DESCRIPTION  -->
              <b-form-textarea
                  id="textarea"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                  class="w-100 m-3"
              ></b-form-textarea>
            </b-col>
          </b-row>
          <b-row>
            <b-button class="ml-3" variant="info" block>Add</b-button>
          </b-row>
        </b-form>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "ExerciseForm"
}
</script>

<style scoped>

</style>