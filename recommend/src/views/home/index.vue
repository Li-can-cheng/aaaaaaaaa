<template>
	<div class="home-container">
		<div class="searchIndex">

			<div class="scaled">
				<div class="home-text">欢迎来到职位推荐系统！</div>
				<div class="down">
					<photo></photo>
				</div>
			</div>
			<div class="contains" :width="nxw">
				<div class="search">
					<div style="width: 70%;margin: 0 auto; text-align: center">
						<el-row span="10">
							<el-col>
								<!-- <linSearch @query="onQueryChange" placeholder="请输入职位名称" ref="searchKeyword" /> -->
								<el-input v-model="searchKeyword" @change="onQueryChange" placeholder="请输入职位名称"
									size="large" clearable>
									<el-button @click="onQueryChange" slot="append" icon="el-icon-search">查询</el-button>
								</el-input>
							</el-col>
						</el-row>
					</div>
					<div class="s_hot">
						热门职位搜索：
						<span class="s_hot_like" @click="searchKeyword = 'java'">&nbsp;Java开发</span>
						<span class="s_hot_like" @click="searchKeyword = '数据'">大数据平台开发</span>
						<span class="s_hot_like" @click="searchKeyword = 'PHP'">PHP</span>
						<span class="s_hot_like" @click="searchKeyword = '数据'">数据挖掘</span>
						<span class="s_hot_like" @click="searchKeyword = 'C++'">C++</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import photo from './photo'

export default {
	name: 'Home',
	components: { photo },
	data() {
		return {
			searchKeyword: '', // 存储搜索关键字
		};
	},
	methods: {
		// 当搜索框中的值发生改变时触发
		onQueryChange() {
			console.log('搜索关键字：', this.searchKeyword);
		}
	}
}
</script>


<style lang="scss" scoped>
.home {
	&-container {
		margin: 30px;
	}

	&-text {
		font-size: 30px;
		line-height: 46px;
		text-align: center;
	}
}

.scaled {
	height: 500px;
	margin: center;

	.down {
		transform: scale(0.95);
		padding-left: 14%;
	}
}

.searchIndex {
	width: 100%;
	background: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	.contains {
		width: 100%;
		margin: 0 auto;

		.search {
			// width: 50px;
			// height: 10px;
			// margin: 0 auto;
			top: 40px;
			text-align: center;
			position: relative;

			.search1 {
				width: initial;
				margin: center;
				text-align: center;
				position: relative;
			}

			.s_box {
				height: 5px;
				padding-top: 2px;

				.search_input,
				.search_button {
					float: left;
					box-sizing: content-box;
					width: 39.5px;
					border: 1px solid #ddd;

					// margin-top: 20px;
					&:focus {
						outline: 0px;
						outline-offset: 0px;
					}
				}

				.search_input {
					height: 19px;
					padding: 16px;
					font-size: 16px;
					border-right: none;

					&:focus {
						border: 1px solid #3CBEF9;
						border-right: 0px;
					}
				}

				.search_button {
					width: 8px;
					height: 51px;
					font-size: 20px;
					line-height: 51px;
					text-align: center;
					cursor: pointer;
					color: #fff;
					border: 1px solid #3CBEF9;
					background: #3CBEF9;
				}
			}

			.s_hot {
				clear: both;
				text-align: center;
				margin-top: 20px;
				color: #666;
				font-size: 14px;

				.s_hot_like {
					color: #3CBEF9;
					margin-right: 16px;
					cursor: pointer;
				}
			}

			.nosee {
				display: none;
			}
		}
	}
}
</style>
