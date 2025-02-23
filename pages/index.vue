<template>
	<!-- FIXME: default styles contain both `position: relative` & `absolute` at equal specificity with unpredicatable order -->
	<MapboxMap
		style="position: absolute"
		:options="{
			style: 'mapbox://styles/mapbox/outdoors-v12',
			center: [-68.137343, 45.137451],
			zoom: 5,
		}"
	/>
</template>
