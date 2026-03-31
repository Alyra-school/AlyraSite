import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

function mapProgramPageRow(row) {
  return {
    overview: row.overview,
    overviewSecondary: row.overview_secondary,
    certificationTitle: row.certification_title,
    certificationDescription: row.certification_description,
    learningPath: row.learning_path ?? [],
    professors: row.professors ?? [],
  };
}

export async function fetchProgramPageContent(program) {
  const fallback = program
    ? {
        overview:
          "Presentation de la formation en cours de finalisation. Vous trouverez ici les objectifs, le positionnement et les competences visees.",
        overviewSecondary:
          "Le detail complet sera disponible tres bientot: rythme, prerequis et modalites d'evaluation.",
        certificationTitle: `Certification Professionnelle ${program.title}`,
        certificationDescription:
          "Certification associee en cours de publication. Contactez-nous pour obtenir le referentiel detaille.",
        learningPath: [
          "Module 1: Fondamentaux du parcours.",
          "Module 2: Mise en pratique et ateliers.",
          "Module 3: Projet applique et soutenance.",
        ],
        professors: [
          {
            name: "Equipe pedagogique Alyra",
            role: "Intervenants experts",
            bio: "La composition complete de l'equipe sera publiee tres prochainement.",
          },
        ],
      }
    : null;

  if (!program) {
    return { data: null, source: "none", error: null };
  }

  if (!isSupabaseConfigured || !supabase) {
    return { data: fallback, source: "local-fallback", error: null };
  }

  const { data, error } = await supabase
    .from("program_pages")
    .select(
      "program_id, overview, overview_secondary, certification_title, certification_description, learning_path, professors"
    )
    .eq("program_id", program.id)
    .maybeSingle();

  if (error) {
    return { data: fallback, source: "fallback-local", error };
  }

  if (!data) {
    return { data: fallback, source: "fallback-local-missing", error: null };
  }

  return { data: mapProgramPageRow(data), source: "supabase", error: null };
}
