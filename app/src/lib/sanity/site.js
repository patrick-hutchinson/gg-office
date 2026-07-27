import {createClient} from "@sanity/client";

export const fallbackSite = {
  title: "GG-OFFICE",
  owner: "GG-OFFICE",
  description: "GG-OFFICE IS AN INDEPENDENT GRAPHIC AND MOTION AGENCY BASED IN SICILY.",
  themeColorsLight: {
    fontColorLight: "#000000",
    backgroundColorLight: "#ffffff",
  },
  themeColorsDark: {
    fontColorDark: "#ffffff",
    backgroundColorDark: "#000000",
  },
  defaultTheme: "light",
  favicon: null,
  email: "",
  phone: "",
};

const client = createClient({
  projectId: "ghlrrzh3",
  dataset: "production",
  apiVersion: "2025-06-27",
  useCdn: true,
});

export const buildSanityImageUrl = (baseUrl, width, height = width) => {
  if (!baseUrl) return null;

  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}w=${width}&h=${height}&fit=crop&auto=format`;
};

export const resolveSite = (site = {}) => {
  const defaultTheme = ["light", "dark", "system"].includes(site?.defaultTheme)
    ? site.defaultTheme
    : fallbackSite.defaultTheme;

  return {
    ...fallbackSite,
    ...site,
    defaultTheme,
    themeColorsLight: {
      ...fallbackSite.themeColorsLight,
      ...site?.themeColorsLight,
    },
    themeColorsDark: {
      ...fallbackSite.themeColorsDark,
      ...site?.themeColorsDark,
    },
  };
};

export async function getSite() {
  const site = await client.fetch(`
    coalesce(*[_id == "site" && _type == "site"][0], *[_type == "site"][0]){
      title,
      owner,
      description,
      themeColorsLight,
      themeColorsDark,
      defaultTheme,
      favicon{
        asset->{
          url
        }
      },
      email,
      phone
    }
  `);

  return resolveSite(site);
}
