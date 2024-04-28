<?php
date_default_timezone_set('Asia/Manila');
function c_log($data) {
    if ($data instanceof mysqli_result) {
        $resultArray = [];
        while ($row = $data->fetch_assoc()) {
            $resultArray[] = $row;
        }
        echo "<script>console.log(" . json_encode($resultArray) . ");</script>";
    } else {
        echo "<script>console.log(" . json_encode($data) . ");</script>";
    }
}


function get_upcoming_events($events) {
    try {
        $currentDate = date('Y-m-d');
        $upcomingEvents = array();

        while ($event = $events->fetch_assoc()) {
            $eventDateStart = $event['EventDateStart'];

            if (strtotime($eventDateStart) >= strtotime($currentDate)) {
                $upcomingEvents[] = $event;
            }
        }

        // Sort the upcoming events array by EventDateStart
        usort($upcomingEvents, function($a, $b) {
            return strtotime($a['EventDateStart']) - strtotime($b['EventDateStart']);
        });
        
        return $upcomingEvents;
    } catch (Exception $e) {
        // Print the error message and stack trace
        echo 'Error occurred: ' . $e->getMessage() . "\n";
        echo 'Stack trace: ' . $e->getTraceAsString() . "\n";
    }
}

function get_ongoing_events($events) {
    try {
        $currentDate = date('Y-m-d');
        $ongoingEvents = array();

        while ($event = $events->fetch_assoc()) {
            $eventDateStart = $event['EventDateStart'];
            $eventDateEnd = $event['EventDateEnd'];

            if (strtotime($eventDateStart) <= strtotime($currentDate) && strtotime($eventDateEnd) >= strtotime($currentDate)) {
                $ongoingEvents[] = $event;
            }
        }

        return $ongoingEvents;
    } catch (Exception $e) {
        // Print the error message and stack trace
        echo 'Error occurred: ' . $e->getMessage() . "\n";
        echo 'Stack trace: ' . $e->getTraceAsString() . "\n";
    }
}


function get_past_events($events) {
    try {
        $currentDate = date('Y-m-d');
        $pastEvents = array();

        while ($event = $events->fetch_assoc()) {
            $eventDateStart = $event['EventDateStart'];

            if (strtotime($eventDateStart) < strtotime($currentDate)) {
                $pastEvents[] = $event;
            }
        }

        return $pastEvents;
    } catch (Exception $e) {
        // Print the error message and stack trace
        echo 'Error occurred: ' . $e->getMessage() . "\n";
        echo 'Stack trace: ' . $e->getTraceAsString() . "\n";
    }
}

?>
