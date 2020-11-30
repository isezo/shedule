<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/style.css">
    <script src="/js/ajax.js"></script>
  </head>
  <body>
    <div class="fixed-middle">
      <div class="container-fluid text-center">
        <h1 class="primary-title">Расчитать рабочее время</h1>
        <form action="" id="contact-form">
          <div class="d-inline-flex mb-5">
            <div class="form-field col-md-5">
              <input type="date" name="startDate" class="form-control" id="startDate">
            </div>
            <div class="form-field col-md-5">
              <input type="date" name="endDate" class="form-control" id="endDate">
            </div>
            <div class="form-field col-md-5">
              <input type="text" name="userId" class="form-control" placeholder="Id пользователя" id="userId">
            </div>
          </div>
          <div class="">
            <button class="btn btn-success btn-big" type="button" onclick="sendJSON()" name="calculate">Расчитать</button>
            <input id="swap" type="checkbox" name="swap" onclick="swp()">Нерабочий график
          </div>
        </form>
        <div class="mt-5"></div>
          <table id="resultWork" class="resultWork">
          </table>
          <table id="resultNonWork" class="resultNonWork" hidden>
          </table>
      </div>
    </div>
  </body>
</html>
