export default {
  methods: {
    compare(a, b) {
      if (a.extra_charge_for_room === null && b.extra_charge_for_room !== null) return -1; // null идет первым
      if (a.extra_charge_for_room !== null && b.extra_charge_for_room === null) return 1; // null идет первым
      if (a.extra_charge_for_room === b.extra_charge_for_room) return 0;
      return a.extra_charge_for_room - b.extra_charge_for_room;
    },
  }
}
