<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex md8 xs12>
        <v-card flat>
          <v-img src="/cover.jpg" height="250px">
            <v-layout column fill-height>
              <v-card-title>
                <v-btn dark icon>
                  <span>
                    <input type="file" ref="cover_file" style="display: none" />
                    <v-icon dark>camera_alt</v-icon>
                  </span>
                </v-btn>
              </v-card-title>
            </v-layout>
          </v-img>
        </v-card>

        <v-toolbar flat extended dense>
          <v-avatar size="125" tile="false">
            <v-img src="logo.png" alt="avatar"></v-img>
          </v-avatar>

          <v-sheet class="mt-5 ml-3">
            <h1 class="title">Matrix Infoline Private Limited</h1>
            <v-card-actions class="px-0">
              <v-icon color="red">star</v-icon>
              <v-icon color="red">star</v-icon>
              <v-icon color="red">star</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <span class="ml-2">136 reviews</span>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-sheet>

          <v-spacer></v-spacer>
          <v-sheet class="mt-5 ml-3">
            <v-avatar tile size="30" class="ml-2">
              <img src="icons/premium.svg" alt="Verified Business" />
            </v-avatar>

            <v-avatar tile size="30" class="ml-2">
              <img src="icons/verified.svg" alt="Verified Business" />
            </v-avatar>

            <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>menu</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title>Report Incorrect</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-sheet>
        </v-toolbar>

        <v-card-text>
          <template>
            <h2>About</h2>
            <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.</p>
            </div>
          </template>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>
          </v-card-text>
      </v-flex>
      <v-flex md4 xs12>Right Panel</v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {}
</script>
