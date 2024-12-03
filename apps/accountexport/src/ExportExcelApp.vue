<template>
	<NcContent app-name="account-export">
		<NcAppNavigation>
			<NcAppNavigationNew
				button-id="export-excel"
				:text="t('settings', 'Export excel')"
			>
				<template #icon>
					<NcIconSvgWrapper :path="mdiPlus" />
				</template>
			</NcAppNavigationNew>
		</NcAppNavigation>
	</NcContent>
</template>

<script>
import {
	mdiAccount,
	mdiAccountGroup,
	mdiAccountOff,
	mdiCog,
	mdiPlus,
	mdiShieldAccount,
	mdiHistory,
} from '@mdi/js';
import NcContent from '@nextcloud/vue/dist/Components/NcContent.js';
import NcAppNavigation from '@nextcloud/vue/dist/Components/NcAppNavigation.js';
import NcIconSvgWrapper from '@nextcloud/vue/dist/Components/NcIconSvgWrapper.js';
import NcAppNavigationNew from '@nextcloud/vue/dist/Components/NcAppNavigationNew.js';

export default {
	name: 'ExportExcelApp',
	components: {
		NcContent,
		NcAppNavigation,
		NcIconSvgWrapper,
		NcAppNavigationNew,
	},
	created() {},
};
</script>

<style scoped lang="scss">
#accountexport {
	display: flex;
	justify-content: center;
	margin: 16px;
}
</style>
