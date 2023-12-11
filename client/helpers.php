<?php
function logme($data)
{
    echo '<script>';
    echo 'console.log(' . json_encode($data) . ')';
    echo '</script>';
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

        return $upcomingEvents;
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
