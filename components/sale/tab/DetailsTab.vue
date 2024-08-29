<script>
export default {
  name: "DetailsTab",
  props: ["details"],
  mounted() {
    var pElements = [...this.$refs.detailsAll.children];
    pElements = pElements.filter(function (item) {
      return item.innerText.trim() !== "";
    });
    for (var i = 0; i < pElements.length; i++) {
      if (pElements[i].innerText !== " ") {
        var newDivElement = document.createElement('div');
        if (!this.isUppercase(pElements[i].innerText)
          && pElements[i].localName !== 'ul') {
          newDivElement.classList.add('clearfix', 'paragraph-text');
          if (pElements[i].firstChild.localName == "u") {
            newDivElement.insertAdjacentHTML("afterbegin", `<div class="left"><div>
           <figure class="icon"><i class="line-icon-information-circle"></i></figure></div></div>`);
            newDivElement.insertAdjacentHTML("beforeend", `<div class="right"><div class="p">
          <span class="block">${pElements[i].innerHTML}</span>
         </div></div>`);
          } else {
            newDivElement.insertAdjacentHTML("beforeend", `<div class="right"><div class="p">
          <span class="block">${pElements[i].innerHTML}</span>
         </div></div>`);
          }
          this.$refs.detailsAll.parentNode.insertBefore(newDivElement, this.$refs.detailsAll)
        } else if (this.isUppercase(pElements[i].innerText) && pElements[i].localName !== 'ul') {
          var newDivElement2 = document.createElement('div');
          var newDivElement3 = document.createElement('span');
          if (!newDivElement3) return null;
          newDivElement.classList.add('clearfix', 'paragraph-textBulletPointsColumns');
          newDivElement2.classList.add('p');
          newDivElement3.classList.add('block');
          var pElement = pElements[i];
          newDivElement3.appendChild(pElement);
          newDivElement2.appendChild(newDivElement3);
          newDivElement.appendChild(newDivElement2);
          if (pElements[i + 1]["localName"] == "ul") {
            newDivElement.appendChild(pElements[i + 1]);
          }
          if (pElements[i + 2]["localName"] == "ul") {
            newDivElement.appendChild(pElements[i + 2]);
          }
          this.$refs.detailsAll.parentNode.insertBefore(newDivElement, this.$refs.detailsAll)
        }
      }
    }
    this.$refs.detailsAll.remove();
  },
  methods: {
    isUppercase(str) {
      return str === str.toUpperCase();
    }
  }
}
</script>

<template>
  <div id="tab-content-details" class="tab-content details">
    <div class="paragraphs">
      <div class="clearfix paragraph-title tag-details">
        <div class="title-only title-with-triplabel">
          <h4>Более подробно <em>—</em></h4>
        </div>
      </div>
      <div id="detailsAll" ref="detailsAll" v-html="details"
           style="display: none"
      ></div>
    </div>
  </div>
</template>

<style scoped>

</style>
