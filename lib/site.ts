export const site = {
  name: "Factum Fitness MMA",
  tagline: "Boxing · Kickboxing · Muay Thai · Jiu Jitsu · MMA · Functional Fitness",
  address: {
    line1: "8383 South 700 West",
    city: "Sandy",
    state: "UT",
    zip: "84070",
  },
  phone: {
    display: "385 · 251 · 8378",
    tel: "+13852518378",
  },
  email: "factumutah@gmail.com",
  socials: [
    { name: "Instagram", handle: "@factumgym", url: "https://www.instagram.com/factumgym/" },
    { name: "Facebook", handle: "TeamFactum", url: "https://facebook.com/TeamFactum" },
    { name: "YouTube", handle: "@factumutah", url: "https://www.youtube.com/channel/UCLjVbvdqxoN6Xfeg3z4bRRQ" },
  ],
  apps: {
    sugarwod: "https://www.sugarwod.com/",
  },
} as const;

export const fullAddress = `${site.address.line1}, ${site.address.city} ${site.address.state} ${site.address.zip}`;
