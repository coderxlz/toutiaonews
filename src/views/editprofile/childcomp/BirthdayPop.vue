<template>
  <div class="birthdayPop">
    <van-popup 
      v-model="birthdayPopShow" 
      position="bottom"
      :close-on-click-overlay="false"
      @click-overlay="$emit('close')">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="comfirm"
        @cancel="cancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { setProfile } from '@/network/profile.js'
import { birthdayFormat } from '@/utils/day.js'
import { Toast } from 'vant';
export default {
  name: "BirthdayPop",
  created () {
    console.log(this.birthday)
  },
  data() {
    return {
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.birthday)
    };
  },
  props: {
    birthdayPopShow: {
      required: true,
      default() {
        return false
      }
    },
    birthday: {
      required: true
    }
  },
  methods: {
  async comfirm(value) {
      const newDate = birthdayFormat(value)
      Toast.loading({
        forbidClick: true
      })
      await setProfile({
        birthday: newDate
      })
      this.$emit('update:birthday',newDate)
      this.$emit('close')
    },
    cancel() {
      this.$emit('close')
    }
  }
};
</script>

<style scoped>
.van-popup--bottom {
  height: 40%;
  background-color: rgb(245, 247, 247);
}
</style>