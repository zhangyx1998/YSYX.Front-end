<script setup>
import Button from "/components/Button.vue";
import Responsive from "/components/Responsive.vue";
import Checkbox from "../../../components/Checkbox.vue";
import Badge from "/components/Badge.vue";
defineProps({
	validate: Function,
	search: Function,
	property: String,
	allowAlt: Boolean,
});
</script>

<template>
	<div Entry>
		<div EntryVal>
			<div title>
				{{ intl(formData[property]) }} 
			</div>
			<div class="container">
				<div style="display: block; position: relative">
					<input
						v-model="searchStr"
						:placeholder="
							intl(
								alt
									? 'Enter alternative name'
									: 'Type to search'
							)
						"
						@focus="focus"
						style="border: none; border-radius: 0"
					/>
					<div
						input
						ref="search"
						style="
							display: flex;
							position: absolute;
							width: 100%;
							height: 100%;
							z-index: 999;
							top: 0;
							left: 0;
							padding-top: 0;
							padding-bottom: 0;
							align-items: center;
							justify-content: space-between;
							border: none;
							border-radius: 0;
						"
						v-show="institution"
					>
						<Badge
							type="accent unselected"
							:name="intl(institution)"
							style="font-size: 0.9em; opacity: 0.9"
						/>
						<Button
							type="seamless gray"
							icon="fas fa-times-circle"
							style="--button-padding: 0.4em; margin: 0"
							@click="
								institution = null;
								this.$refs.search.focus();
							"
						/>
					</div>
				</div>
				<transition name="fold-up">
					<div
						dropdown
						v-if="!institution && !alt && (searchResult || loading)"
						style="max-height: 30vh; overflow-y: scroll"
					>
						<span class="searchEntry" v-if="loading"
							>Loading ...</span
						>
						<span
							class="searchEntry"
							style="color: gray"
							v-else-if="Object.keys(searchResult).length == 0"
							>There is no result for what you searched.</span
						>
						<template v-else>
							<Responsive
								v-for="(name, ID) in searchResult"
								:key="ID"
								class="searchEntry"
								@click="select(ID)"
							>
								<div
									style="
										flex-grow: 1;
										text-overflow: ellipsis;
										overflow: hidden;
									"
								>
									{{ intl(name) }}
								</div>
								<div
									style="font-size: 0.8em; color: var(--gray)"
								>
									{{ intl(ID) }}
								</div>
							</Responsive>
						</template>
					</div>
				</transition>
			</div>
			<Checkbox :selected="alt" @click="alt = !alt">{{
				intl({
					"zh-CN": "搜索不到想要的结果？",
					"en-US": "Can't' find appropriate search result?",
				})
			}}</Checkbox>
		</div>
	</div>
</template>

<script>
import { intl } from "/util/env.js";
import { formData } from '/apply/formData.json'
export default {
	emits: ["update", "update-alt"],
	data() {
		return {
			formData,
			searchStr: "",
			searchResult: null,
			institution: null,
			loading: false,
			altStr: "",
			warn: "",
			alt: false,
		};
	},
	methods: {
		select(ID) {
			this.institution = this.searchResult[ID];
			this.$emit("update", ID);
		},
		searchStrValid(val) {
			return val.trim().replace(/[^\x00-\xff]/g, "**").length >= 2;
		},
		runSearch(val) {
			this.searchResult = null;
			if (this.searchStrValid(val)) {
				this.loading = true;
				this.search(val).then((result) => {
					this.searchResult = result;
					this.loading = false;
				});
			}
		},
		intl,
	},
	watch: {
		searchStr(val) {
			if (!this.alt) {
				this.runSearch(val);
			} else {
				this.altStr = val;
			}
		},
		altStr(value) {
			if (this.validate(value)) {
				this.$emit("update-alt", value);
			} else {
				this.$emit("update-alt", null);
			}
		},
		alt(alt) {
			if (alt) {
				this.institution = null;
				this.altStr = this.searchStr;
			} else {
				this.altStr = '';
				this.runSearch(this.searchStr);
			}
		},
		institution(val) {
			if (val == null) {
				this.$emit('update', null);
			}
		}
	},
};
</script>

<style scoped>
.container {
	font-size: 14px;
	border: 1px solid var(--gray-border);
	border-radius: 6px;
	box-sizing: border-box;
	overflow: hidden;
}
.searchEntry {
	font-size: 14px;
	border-top: 1px solid var(--gray-border);
	box-sizing: border-box;
	padding: 11px 12px;
	display: flex;
}
[dropdown] > * {
	background-color: var(--white-brighter);
}
</style>