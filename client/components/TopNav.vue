<template>

<div>
  <v-toolbar
    color="white"
    app
    :clipped-left="$vuetify.breakpoint.mdAndUp"
    :clipped-right="$vuetify.breakpoint.mdAndUp"
    fixed
    class="elevation-0"
    style="border-bottom:0px solid"
  >
    <v-toolbar-title class="mr-4 pl-0">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">Trade Plus</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon @click.stop="dialog = true">apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-btn icon large>
      <v-avatar size="32px" tile>
        <img
          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          alt="Vuetify"
        />
      </v-avatar>
    </v-btn>
  </v-toolbar>

<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>User Controls</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Content filtering</v-list-tile-title>
              <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Password</v-list-tile-title>
              <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-checkbox></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Notifications</v-list-tile-title>
              <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Sound</v-list-tile-title>
              <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-checkbox></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Auto-add widgets</v-list-tile-title>
              <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>

</div>
</template>

<script>
export default {
  data(){
    return {
      dialog: false
    }
  }
}
</script>
