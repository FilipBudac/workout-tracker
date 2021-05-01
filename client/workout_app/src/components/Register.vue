<template>
  <div>
    <div>
      <div class="wrapper d-flex justify-content-center">
        <div class="form-wrapper w-50 p-5 ">
          <div class="jumbotron border border-primary rounded-100">
            <form>
              <div class="form-group clearfix">
                <div class="form-group">
                  <label for="exampleInputNickname">Nickname</label>
                  <input type="text" class="form-control" id="exampleInputNickname" placeholder="Nickname">
                </div>
                  <div class="form-name float-left">
                    <label for="exampleInputName">Name</label>
                    <input type="text" class="form-control" id="exampleInputName" placeholder="Enter name">
                  </div>
                <div class="form-surname float-right">
                  <label for="exampleInputEmail1">Surname</label>
                  <input type="text" class="form-control" id="exampleInputSurname" placeholder="Enter surname">
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
              </div>
              <div class="form-group">
                <label for="exampleInputPasswordRepeat">Repeat password</label>
                <input type="password" class="form-control" id="exampleInputPasswordRepeat" placeholder="Repeat password">
              </div>
              <button type="submit" class="btn btn-outline-primary w-50">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Register"
}
</script>

<style scoped>

</style>