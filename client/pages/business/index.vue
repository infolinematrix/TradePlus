<template>
  
</template>
<script>
export default {
 mounted: function() {
        this.$axios.get("add-business").then(response => {
                if (response) {
                     if(response.data.node != null) {
                     let business = response.data.node;
                     this.$root.$router.push({path: '/business/edit'})
                }else{
                this.$root.$router.push({path: '/business/create'})
              }
            }
          })
        },
  
};
</script>