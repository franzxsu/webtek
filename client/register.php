
<div class="modal fade" id="confirmModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    
      <div class="modal-header">
        <h5 class="modal-title">Confirm Registration</h5>
        <button type="button" class="close" data-dismiss="modal">
          <span>&times;</span>
        </button>
      </div>

      <div class="modal-body">
        <p>Register for event?</p>
      </div>

      <div class="modal-footer">
        <button class="btn btn-success">Yes</button>
        <button class="btn btn-secondary" data-dismiss="modal">No</button>
      </div>

    </div>
  </div>
</div>
<script>

$('.registerBtn').click(function() {

  let eventId = $(this).data('id');
  
  $('#confirmModal').modal('show');

})

</script>