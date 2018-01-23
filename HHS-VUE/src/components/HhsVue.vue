<template>
  <div id="pro">
    <div v-if="partData.partJson" class="pro-block" :class="showClass('part',index)" :key="index"  v-for="(part,index) in partData.partJson">
      <img class="ld" :pc-src="imgSrc('p',index)" :mb-src="imgSrc('m',index)" alt="">
      <template v-for="(linkId,index2) in partData.partJson[index]">
        <a v-if="testHref(/^#/, linkId)" :key="index2" :href="linkId" class="plink" :class="showClass('link',index2)"></a>
        <a  v-if="testHref(/^\s*$/, linkId)" :key="index2" href="javascript:;" class="plink" :class="showClass('link',index2)"></a>
        <template v-if="testHref(/^BIO/, linkId)">  
          <a :key="showKey('link',index2)" :href="showProdHref(linkId)" class="plink" :class="showClass('link',index2)" target="_blank"></a>
          <a :key="showKey('bt',index2)" :href="showProdHref(linkId)" class="plink js-button_shop_now" :class="showClass('bt',index2)"></a>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import partData from "@/data/part-data.js";
export default {
  name: "HhsVue",
  data() {
    return {
      partData: {
        pageId: "",
        partJson: []
      },
      showProd: false,
      href: false,
      jsHref: false
    };
  },
  beforeCreate() {
    this.$nextTick(() => {
      this.partData = partData;
    });
  },
  methods: {
    showClass(prefix, index) {
      return `${prefix}${index + 1}`;
    },
    imgSrc(imgPrefix, index) {
      let imgNum = index + 1;
      imgNum = imgNum < 10 ? `0${imgNum}` : imgNum;
      return `landing/2018/${
        this.partData.pageId
      }/images/${imgPrefix}_${imgNum}.jpg?$staticlink$`;
    },
    showProdHref(linkId) {
      return `$url('Product-Show','pid','${linkId}')$`;
    },
    showKey(prefix, ind) {
      return `${prefix}${ind}`;
    },
    testHref(reg, linkId) {
      return reg.test(linkId);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
