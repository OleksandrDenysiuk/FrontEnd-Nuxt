<template>
    <div class="en-generalInput">
        <div class="en-generalInput-input">
            <label class="en-generalInput-input-label">{{label}}</label>
            <input class="en-generalInput-input-inp"  :value="value"  v-bind="$attrs"   @input="$emit('input',$event.target.value)" type="text">
        </div>
    </div>
</template>


<script>
export default {
    props:{
        label:String,
        value:String,
    }
}
</script>

<style lang="scss" scoped>
.en-generalInput{
            &-input{
                display: flex;
                flex-flow: column;
                color: rgb(36, 36, 36);
                width: 100%;
                font-size: 16px;
                align-self: center;
                &-inp{
                    color: rgb(36, 36, 36);
                    &::placeholder{
                    color: rgb(36, 36, 36);
                    }
                    outline: none;
                    border: 1px solid rgba(224, 224, 224, 0.938);
                   width: 100%;
                    padding: 5px;
                    border-radius: 10px;                    
                }
            }
}
</style>