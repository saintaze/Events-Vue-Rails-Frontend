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
            <th>Lasts All Day</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in myEvents" :key="event.id">
            <td>{{event.id}}</td>
            <td>{{event.title}}</td>
            <td>{{event.start | dateFormat}}</td>
            <td>{{event.end | dateFormat}}</td>
            <td>{{event.allDay ? 'Yes' : 'No'}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment';
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
        weekends: true,
        eventDisplay: 'block',
        eventTimeFormat: {
          hour: '2-digit',
          minute: '2-digit',
          meridiem: true
        }
      }
    },
    eventHandlers(){
      return {
        select: this.handleAddEvent,
        eventClick: this.handleRemoveEvent,
        eventChange: this.handleUpdateEvent
      }
    },
    myEvents(){
      this.calendarOptions.events = this.$store.getters.events;
      return this.$store.getters.events;
    }
  },
  async created() {
    this.calendarOptions = this.options;
    await this.$store.dispatch('fetchEvents');
    this.calendarOptions.events = this.$store.getters.events;
  }, 
  methods: {
    async handleAddEvent(selectInfo) {
      let title = prompt('Please enter a new title for your event');
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); 
      if (!title) return;
      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: selectInfo.allDay ? 'purple': 'green',
        borderColor: selectInfo.allDay ? 'purple': 'green'
      }
      const res = await axios.post(API_ENDPOINT_EVENTS, {event: newEvent});
      this.$store.commit('addEvent', res.data.event);
    },
    async handleRemoveEvent(eventData) {
      const shouldDelete = confirm(`Are you sure you want to delete the event '${eventData.event.title}'`);
      if (shouldDelete) {
        const res = await axios.delete(`${API_ENDPOINT_EVENTS}/${eventData.event.id}`);
        this.$store.commit('deleteEvent', res.data.event.id);
      }
    },
    async handleUpdateEvent(eventData){
      const {startStr, endStr, id} = eventData.event;
      const updatedEvent = {id, event: {start: startStr, end: endStr}}
      const res = await axios.patch(`${API_ENDPOINT_EVENTS}/${eventData.event.id}`, updatedEvent);
      this.$store.commit('updateEvent', res.data);
    }
  },
  filters: {
    dateFormat(dateStr) {
      return moment(dateStr).format("ddd, MMM Do YYYY, h:mm a");
    }
  }
}
</script>


<style lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700');

h2 {
 font-family:'Source Sans Pro', sans-serif;
 max-width: 1100px;
 margin: 40px auto;
}

.events-table {
  font-family:'Source Sans Pro', sans-serif;
  width: 1100px;
	max-width: 1100px !important; 
	border-collapse: collapse; 
	margin: 0 auto 50px;
  
  tr:nth-of-type(odd) { 
	  background: #EEEEEE; 
	}

  th { 
    background: #111; 
    color: white; 
    font-weight: normal;
    font-size: 16px;
	}

  td, th { 
    text-align: center !important;
    padding: 10px; 
    text-align: left; 
  }

  td {
    font-size: 14px;
  }
}

i {
  font-style: normal;
}

b {
  font-size: 12.5px;;
  margin-right: 5px;
}

.main {
  flex-grow: 1;
  padding: 3em;
}

.fc { 
  max-width: 1100px;
  margin: 0 auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  background-color: white;
}
</style>


