<template>
  <div v-if="modelChosen === 'model1'">
    <CvPreviewModel1
      :personalInfos="personalInfos"
      :titleAndSub="titleAndSub"
      :proExperiences="proExperiences"
      :formations="formations"
      :skills="skills"
      />
  </div>
    <div v-else-if="modelChosen === 'model2'">
        <CvPreviewModel2
            :personalInfos="personalInfos"
            :titleAndSub="titleAndSub"
            :proExperiences="proExperiences"
            :formations="formations"
            :skills="skills"
            />
    </div>
    <div v-else-if="modelChosen === 'model3'">
        <CvPreviewModel3
            :personalInfos="personalInfos"
            :titleAndSub="titleAndSub"
            :proExperiences="proExperiences"
            :formations="formations"
            :skills="skills"
            />
    </div>
    <div v-else-if="modelChosen === 'model4'">
        <!-- Add Model4 component here when available -->
    </div>
    <div v-else-if="modelChosen === 'model5'">
        <!-- Add Model5 component here when available -->
    </div>

</template>

<script setup>

import { CvPreviewModel1, CvPreviewModel2, CvPreviewModel3 } from '#components';

const props = defineProps({
  modelChosen: {
    type: String,
    default: 'model1'
  },
  personalInfos: {
    type: Object,
    default: () => ({})
  },
  titleAndSub: {
    type: Object,
    default: () => ({})
  },
  proExperiences: {
    type: Array,
    default: () => []
  },
  formations: {
    type: Array,
    default: () => []
  },
  skills: {
    type: Array,
    default: () => []
  }
});

</script>

<style>

</style>