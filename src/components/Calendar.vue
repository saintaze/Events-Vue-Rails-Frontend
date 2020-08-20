<template>

  <div class="main">
    <FullCalendar
        class='demo-app-calendar'
        :options='options'
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
    </FullCalendar>
    <div v-if="myEvents.length" class="events">
      <h2>Events ({{myEvents.length}})</h2>
      <table class="events-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Last All Day</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in myEvents" :key="event.id">
            <td>{{event.id}}</td>
            <td>{{event.title}}</td>
            <td>{{event.start}}</td>
            <td>{{event.end}}</td>
            <td>{{event.allDay ? 'Yes' : 'False'}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


/////////////  JS

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios';

import {API_ENDPOINT_EVENTS} from '@/constants';


export default {
  name: 'calendar',
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },

  data: () => {
    return {
      calendarOptions: {}
    }
  },
  computed: {
    options(){
      return {
        ...this.plugins,
        ...this.headerOptions,
        ...this.configOptions,
        ...this.eventHandlers  
      }
    },
    plugins(){
      return {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ]
      };
    },
    headerOptions(){
      return {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }
      }
    },
    configOptions(){
      return {
        initialView: 'dayGridMonth',
        events: null, 
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true
      }
    },
    eventHandlers(){
      return {
        select: this.handleAddEvent,
        eventClick: this.handleRemoveEvent,
        // eventAdd: this.handleAddEvent,
        // eventRemove: this.handleRemoveEvent,
        eventChange: this.handleUpdateEvent,
        // eventsSet: this.handleEventsSet
      }
    },
    currentEvents(){
      return this.$store.getters.currentEvents;
    },
    myEvents(){
      this.calendarOptions.events = this.$store.getters.initialEvents;
      console.log('MY EVENTS', this.$store.getters.initialEvents)
      return this.$store.getters.initialEvents;
    }
  },
  // watch: {
  //   myEvents(){
  //     this.calendarOptions.events = this.$store.getters.initialEvents

  //   }
  // },
  async created() {
    this.calendarOptions = this.options;
    await this.$store.dispatch('fetchEvents');
    this.calendarOptions.events = this.$store.getters.initialEvents;
  }, 
  methods: {
    async handleAddEvent(selectInfo) {
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect() 
      if (!title) return;
      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: true//selectInfo.allDay
      }
      console.log('SEND SERVER', {event: newEvent})
      const res = await axios.post(API_ENDPOINT_EVENTS, {event: newEvent});
      
      console.log('ADD', res.data.event)
      this.$store.commit('addEvent', res.data.event);

    },
    async handleRemoveEvent(eventData) {
      const shouldDelete = confirm(`Are you sure you want to delete the event '${eventData.event.title}'`)
      if (shouldDelete) {
        // clickInfo.event.remove()
        console.log('DELETE', eventData.event)
        const res = await axios.delete(`${API_ENDPOINT_EVENTS}/${eventData.event.id}`);
        console.log('DELETE RES', res.data.event.id)
        this.$store.commit('deleteEvent', res.data.event.id)
      }
    },
    // handleEventsSet(events){
    //   this.$store.commit('setCurrentEvents', events)
    // },
    // async handleAddEvent(eventData, event){
    //   const res = await axios.post(API_ENDPOINT_EVENTS, {event: eventData});
    //   this.$store.commit('addEvent', res);
    // },
    // async handleRemoveEvent(eventData){
    //   console.log('DELETE', eventData)
    //   const res = await axios.delete(`${API_ENDPOINT_EVENTS}/${eventData.event.id}`);
    // },
    async handleUpdateEvent(eventData){
      console.log('UPDATE', eventData.event)
      const {startStr, endStr, id} = eventData.event;
      const updatedEvent = {id, event: {start: startStr, end: endStr}}
      const res = await axios.patch(`${API_ENDPOINT_EVENTS}/${eventData.event.id}`, updatedEvent);
      console.log('UP RES', res)
      this.$store.commit('updateEvent', res.data)
      // console.log('UPdayte res', res)
    }
  }
}
</script>



<style lang='scss'>

h2 {
 font-family: Arial, Helvetica, sans-serif;
 max-width: 1100px;
 margin: 40px auto;
}

.events-table {
  font-family: Arial, Helvetica, sans-serif;
  width: 1100px;
	max-width: 1100px !important; 
	border-collapse: collapse; 
	margin: 0 auto 50px;
  
  tr:nth-of-type(odd) { 
	  background: rgb(255, 250,229); 
	}

  th { 
    background: rgb(55, 138, 211); 
    color: white; 
    font-weight: normal
	}

  td, th { 
    padding: 10px; 
    border: 1px solid #ccc; 
    text-align: left; 
    font-size: 16px;
  }

  td {
    font-size: 14px;
  }

}

@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px)  {

	.events-table { 
	  	width: 100%; 
	}

	/* Force table to not be like tables anymore */
	.events-table, .events-table thead, .events-table tbody, .events-table th, .events-table td, .events-table tr { 
		display: block; 
	}
	
	/* Hide table headers (but not display: none;, for accessibility) */
	.events-table thead tr { 
		position: absolute;
		top: -9999px;
		left: -9999px;
	}
	
	.events-table tr { border: 1px solid #ccc; }
	
	.events-table td { 
		/* Behave  like a "row" */
		border: none;
		border-bottom: 1px solid #eee; 
		position: relative;
		padding-left: 50%; 
	}

	.events-table td:before { 
		/* Now like a table header */
		position: absolute;
		/* Top/left values mimic padding */
		top: 6px;
		left: 6px;
		width: 45%; 
		padding-right: 10px; 
		white-space: nowrap;
		/* Label the data */
		content: attr(data-column);

		color: #000;
		font-weight: bold;
	}

}



b { /* used for event dates/times */
  margin-right: 3px;
}

.main {
  flex-grow: 1;
  padding: 3em;
}

.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

// .fc-event {
//   background-color: #378ad3;
//   color: white;
// }

</style>


