<template>
  <div class="hero-edit">
    <h1>{{id ? '编辑英雄' : '新建英雄'}}</h1>
    <el-form ref="Form" label-width="120px">
      <el-tabs type="border-card">

        <el-tab-pane label="基本信息" >
          <el-form-item label="名称">
            <el-input type="text" v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input type="text" v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top: 0.6rem;"
              :max="10"
              show-score
              v-model="model.scores.difficulty"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top: 0.6rem;"
              :colors="['#3498db', '#3498db', '#3498db']"
              :max="10"
              show-score
              v-model="model.scores.skills"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top: 0.6rem;"
              :colors="['#e74c3c', '#e74c3c', '#e74c3c']"
              :max="10"
              show-score
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top: 0.6rem;"
              :colors="['#2ecc71', '#2ecc71', '#2ecc71']"
              :max="10"
              show-score
              v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="封面">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="res => $set(model, 'cover', res.url)"
            >
              <img v-if="model.cover" :src="model.cover" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="技能">
          <el-button type="text" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="技能名称">
                <el-input type="text" v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="技能图片">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input type="text" v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input type="text" v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="技能提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.skills.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="最佳拍档">
          <el-button type="text" @click="model.partners.push({})"><i class="el-icon-plus"></i>添加</el-button>
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="12" v-for="(item, index) in model.partners" :key="index">
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option v-for="hero in heros" :key="hero._id" :label="hero.name" :value="hero._id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.partners.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="被谁克制">
          <el-button type="text" @click="model.backs.push({})"><i class="el-icon-plus"></i>添加</el-button>
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="12" v-for="(item, index) in model.backs" :key="index">
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option v-for="hero in heros" :key="hero._id" :label="hero.name" :value="hero._id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.backs.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="克制谁">
          <el-button type="text" @click="model.fronts.push({})"><i class="el-icon-plus"></i>添加</el-button>
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="12" v-for="(item, index) in model.fronts" :key="index">
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option v-for="hero in heros" :key="hero._id" :label="hero.name" :value="hero._id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.fronts.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

      </el-tabs>
      <el-form-item style="margin-top: 1rem;">
        <el-button type="primary" native-type="submit" @click.prevent="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "hero-edit",
  props: {
    id: String
  },
  data() {
    return {
      model: {
        name: "",
        avatar: "",
        title: "",
        scores: {},
        skills: [],
        partners: [],
        backs: [],
        fronts: [],
        cover: ''
      },
      categories: [],
      items: [],
      heros: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("heroes", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功！"
      });
      this.$router.push("/heroes/list");
    },
    async getHero() {
      const res = await this.$http.get(`heroes/${this.id}`);
      // this.model = res.data
      this.model = Object.assign({}, this.model, res.data); // 这样赋值不会将原先内容覆盖掉
    },
    async getCategories() {
      // 获取英雄类型
      const res = await this.$http.get("categories");
      this.categories = res.data;
    },
    async getItems() {
      const res = await this.$http.get("items");
      this.items = res.data;
    },
    afterUpload(res) {
      // 图片上传至服务器之后
      this.model.avatar = res.url;
    },
    async getHeros () {
      const res = await this.$http.get('heroes')
      this.heros = res.data
    }
  },
  created() {
    this.getCategories();
    this.getItems();
    this.getHeros();
    this.id && this.getHero();
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  min-width: 5rem;
  height: 5rem;
  display: block;
}
</style>