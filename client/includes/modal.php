<div class="modal fade" id="exampleModalToggle_'.$eventID.'" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Register to     ' . $eventName . '</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p>' . $eventInfo . '</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <a class="btn btn-primary" data-bs-toggle="modal" data-bs-dismiss="modal" href="#modal2" role="button">Register to event</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="modal2" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Registration Successful!</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p>You have now registered to ' . $eventName. '</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Go back to Home</button>
                                    <a type="button" class="btn btn-primary" data-bs-dismiss="modal" href="#modal2">Go to my events</a>
                                </div>
                            </div>
                        </div>
                    </div>