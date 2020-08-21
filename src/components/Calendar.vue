<template>
  <FullCalendar
      class='demo-app-calendar'
      :options='options'
    >
      <template v-slot:eventContent='arg'>
        <b>{{ arg.timeText }}</b>
        <i>{{ arg.event.title }}</i>
      </template>
  </FullCalendar>
</template>


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
    FullCalendar
  },
  data(){
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
          interactionPlugin
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
    }
  },
  async created() {
    this.calendarOptions = this.options;
    await this.$store.dispatch('fetchEvents');
    this.calendarOptions.events = this.$store.getters.events;
  }, 
  methods: {
    syncEvents(){
      this.calendarOptions.events = this.$store.getters.events;
    },
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
      this.syncEvents();
    },
    async handleRemoveEvent(eventData) {
      const shouldDelete = confirm(`Are you sure you want to delete the event '${eventData.event.title}'`);
      if (shouldDelete) {
        const res = await axios.delete(`${API_ENDPOINT_EVENTS}/${eventData.event.id}`);
        this.$store.commit('deleteEvent', res.data.event.id);
        this.syncEvents();  
      }
    },
    async handleUpdateEvent(eventData){
      const {startStr, endStr, id} = eventData.event;
      const updatedEvent = {id, event: {start: startStr, end: endStr}}
      const res = await axios.patch(`${API_ENDPOINT_EVENTS}/${eventData.event.id}`, updatedEvent);
      this.$store.commit('updateEvent', res.data);
      this.syncEvents();
    }
  }
}
</script>


<style lang='scss'>

i {
  font-style: normal;
}

b {
  font-size: 12.5px;;
  margin-right: 5px;
}

.fc { 
  font-size: 15px;

  &-toolbar#{&}-toolbar-ltr#{&}-header-toolbar {
    margin-bottom: 3rem;
    text-align: center;
  }
}

</style>


