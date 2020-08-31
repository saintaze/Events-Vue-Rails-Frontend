<template>
  <div class="events" v-if="myEvents.length" >
    <h2 class="events-header">Events ({{myEvents.length}})</h2>
    <table class="events-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Lasts All Day</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(event, index) in myEvents" :key="event.id">
          <td>{{index + 1}}</td>
          <td>{{event.title}}</td>
          <td>{{event.start | dateFormat}}</td>
          <td>{{event.end | dateFormat}}</td>
          <td>{{event.allDay ? 'Yes' : 'No'}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'events',
  computed: {
    myEvents(){
      return this.$store.getters.events;
    }
  },
  filters: {
    dateFormat(dateStr) {
      return moment(dateStr).format("ddd, MMM Do YYYY, h:mm a");
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700');

.events {
  font-family:'Source Sans Pro', sans-serif;

  &-header {
    margin: 32px auto;
  }
  
  &-table {
    width: 100%;
	  border-collapse: collapse; 
  
    tr:nth-of-type(odd) { 
      background-color: #eee; 
    }

    td, th { 
      text-align: center;
      padding: 10px;
    }

    th { 
      background: #111; 
      color: white; 
      font-weight: normal;
      font-size: 16px;
    }

    td {
      font-size: 14px;
    }
  }
}

</style>