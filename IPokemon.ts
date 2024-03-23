type NameURL = { name: string, url: string };

export interface IPokemon {
  abilities: {
    ability: NameURL,
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  cries: {
    latest: string  //url to sound file
    legacy: string  //url
  }
  forms: NameURL[];
  game_indices: {
    game_index: number;
    version: {
      name: string,
      url: string,
    };
  }[];
  height: number;
  held_items: {
    item: {
      name: string;
      url: string;
    }
    version_details: {
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }[]
  }[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: NameURL;
    version_group_details: {
      "level_learned_at": number,
      "move_learn_method": NameURL,
      "version_group": NameURL
    }[]
  }[],
  name: string,
  order: number,
  past_abilities: {
    ability: NameURL,
    is_hidden: boolean;
    slot: number;
  }[];
  past_types: {}[];
  species: NameURL;
  sprites?: {
    "back_default": string | null,
    "back_female": null,
    "back_shiny": string | null,
    "back_shiny_female": null,
    "front_default": string | null,
    "front_female": string | null,
    "front_shiny": string | null;
    "front_shiny_female": string | null;
    "other":
    {
      "dream_world":
      {
        "front_default": string | null;
        "front_female": null
      },
      "home":
      {
        "front_default": string | null;
        "front_female": string | null;
        "front_shiny": string | null;
        "front_shiny_female": string | null;
      },
      "official-artwork":
      {
        "front_default": string | null;
        "front_shiny": string | null;
      },
      "showdown":
      {
        "back_default": string | null;
        "back_female": string | null;
        "back_shiny": string | null;
        "back_shiny_female": string | null;
        "front_default": string | null;
        "front_female": string | null;
        "front_shiny": string | null;
        "front_shiny_female": string | null;
      }
    },
    "versions":
    {
      "generation-i":
      {
        "red-blue":
        {
          "back_default": string;
          "back_gray": string;
          "back_transparent": string;
          "front_default": string;
          "front_gray": string;
          "front_transparent": string;
        },
        "yellow":
        {
          "back_default": string;
          "back_gray": string;
          "back_transparent": string;
          "front_default": string;
          "front_gray": string;
          "front_transparent": string;
        }
      },
      "generation-ii":
      {
        "crystal":
        {
          "back_default": string;
          "back_shiny": string;
          "back_shiny_transparent": string;
          "back_transparent": string;
          "front_default": string;
          "front_shiny": string;
          "front_shiny_transparent": string;
          "front_transparent": string;
        },
        "gold":
        {
          "back_default": string;
          "back_shiny": string;
          "front_default": string;
          "front_shiny": string;
          "front_transparent": string;
        },
        "silver":
        {
          "back_default": string;
          "back_shiny": string;
          "front_default": string;
          "front_shiny": string;
          "front_transparent": string;
        }
      },
      "generation-iii":
      {
        "emerald":
        {
          "front_default": string;
          "front_shiny": string;
        },
        "firered-leafgreen":
        {
          "back_default": string;
          "back_shiny": string;
          "front_default": string;
          "front_shiny": string;
        },
        "ruby-sapphire":
        {
          "back_default": string;
          "back_shiny": string;
          "front_default": string;
          "front_shiny": string;
        }
      },
      "generation-iv":
      {
        "diamond-pearl":
        {
          "back_default": string | null;
          "back_female": string | null;
          "back_shiny": string | null;
          "back_shiny_female": string | null;
          "front_default": string | null;
          "front_female": string | null;
          "front_shiny": string | null;
          "front_shiny_female": string | null;
        },
        "heartgold-soulsilver":
        {
          "back_default": string | null;
          "back_female": string | null;
          "back_shiny": string | null;
          "back_shiny_female": string | null;
          "front_default": string | null;
          "front_female": string | null;
          "front_shiny": string | null;
          "front_shiny_female": string | null;
        },
        "platinum":
        {
          "back_default": string | null;
          "back_female": string | null;
          "back_shiny": string | null;
          "back_shiny_female": string | null;
          "front_default": string | null;
          "front_female": string | null;
          "front_shiny": string | null;
          "front_shiny_female": string | null;
        }
      },
      "generation-v":
      {
        "black-white":
        {
          "animated":
          {
            "back_default": string | null;
            "back_female": string | null;
            "back_shiny": string | null;
            "back_shiny_female": string | null;
            "front_default": string | null;
            "front_female": string | null;
            "front_shiny": string | null;
            "front_shiny_female": string | null;
          },
          "back_default": string | null;
          "back_female": string | null;
          "back_shiny": string | null;
          "back_shiny_female": string | null;
          "front_default": string | null;
          "front_female": string | null;
          "front_shiny": string | null;
          "front_shiny_female": string | null;
        }
      },
      "generation-vi":
      {
        "omegaruby-alphasapphire":
        {
          "front_default": string | null;
          "front_female": string | null;
          "front_shiny": string | null;
          "front_shiny_female": string | null;
        },
        "x-y":
        {
          "front_default": string | null;
          "front_female": string | null;
          "front_shiny": string | null;
          "front_shiny_female": string | null;
        }
      },
      "generation-vii":
      {
        "icons":
        {
          "front_default": string | null;
          "front_female": string | null;
        },
        "ultra-sun-ultra-moon":
        {
          "front_default": string | null;
          "front_female": string | null;
          "front_shiny": string | null;
          "front_shiny_female": string | null;
        }
      },
      "generation-viii":
      {
        "icons":
        {
          "front_default": string | null;
          "front_female": string | null;
        }
      }
    }
  },
  stats: {
    "base_stat": number;
    "effort": number;
    "stat": NameURL;
  }[],
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };

    weight: number;
  }
}
