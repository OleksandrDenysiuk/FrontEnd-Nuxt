<template>
    <div class="en-selectInput">
        <div class="en-selectInput-content">
                        <label class="en-selectInput-content-label">{{label}}</label>
            <select
          v-bind="$attrs"
          @change="$emit('changedSelect', $event.target.value)"
             class="en-selectInput-content-select">

  <slot/>

</select>
        </div>
        
    </div>
</template>
<script>
export default {
    props:{
        label:String,
    }
}
</script>
<style lang="scss">
.en-selectInput{
    width: 100%;
    &-content{
        &-select{
            width: 100%;
          border: 1px solid rgba(224, 224, 224, 0.938);
           font-size: 18px;
             border-radius: 10px;
          color: rgba(34, 37, 42, 0.87);
          background-color: transparent;
        &:focus{
            outline: none;
        }
        }
    }
}
</style>