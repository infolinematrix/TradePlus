
const util = {


  text_truncate(str, length, ending) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  },


  category_url (str, store) {

    let str_location = ''
    let location = store.getters['app/filter'].location

    if (location) {
      str_location = '/' + location.slug
    }

    return '/browse/' + str + str_location
  }

}

export default util
