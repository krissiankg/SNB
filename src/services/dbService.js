/**
 * Service de persistance Cloud pour Supabase REST API
 * Utilise l'API REST de Supabase (PostgREST) pour éviter d'alourdir l'application.
 */

export const getSupabaseConfig = () => {
  // 1. Lire en priorité absolue les variables d'environnement (Vercel, Netlify, .env)
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (envUrl && envKey) {
    return {
      enabled: true,
      supabaseUrl: envUrl,
      supabaseAnonKey: envKey,
      isFromEnv: true
    };
  }

  // 2. Repli sur le localStorage
  const saved = localStorage.getItem('snb_supabase_config');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Erreur de lecture de la config Supabase", e);
    }
  }
  return {
    enabled: false,
    supabaseUrl: '',
    supabaseAnonKey: ''
  };
};

export const saveSupabaseConfig = (config) => {
  if (config && config.isFromEnv) return; // Ne pas surcharger l'environnement système
  localStorage.setItem('snb_supabase_config', JSON.stringify(config));
};

/**
 * Récupère tous les messages depuis la table 'messages' de Supabase
 */
export async function fetchCloudMessages(config) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/messages?select=*&order=id.desc`;
  
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    
    if (!res.ok) {
      throw new Error(`Erreur HTTP Supabase: ${res.status}`);
    }
    
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Erreur lors de la récupération des messages Supabase :", err);
    throw err;
  }
}

/**
 * Enregistre un message dans la table 'messages' de Supabase
 */
export async function saveCloudMessage(config, msg) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/messages`;
  
  const payload = {
    name: msg.name || '',
    email: msg.email || '',
    subject: msg.subject || '',
    message: msg.message || '',
    date: msg.date || new Date().toLocaleString('fr-FR'),
    read: false
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Impossible d'enregistrer le message sur Supabase (${res.status}): ${errText}`);
    }
    
    const data = await res.json();
    return data[0]?.id; // Renvoie l'ID créé par Supabase (clé primaire numérique ou UUID)
  } catch (err) {
    console.error("Erreur d'écriture Supabase :", err);
    throw err;
  }
}

/**
 * Supprime un message dans Supabase
 */
export async function deleteCloudMessage(config, id) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/messages?id=eq.${id}`;
  
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    
    if (!res.ok) {
      throw new Error(`Impossible de supprimer le message sur Supabase (${res.status})`);
    }
    return true;
  } catch (err) {
    console.error("Erreur de suppression Supabase :", err);
    throw err;
  }
}

/**
 * Marque un message comme lu dans Supabase
 */
export async function markCloudMessageAsRead(config, id) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/messages?id=eq.${id}`;
  
  const payload = {
    read: true
  };

  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      throw new Error(`Impossible de mettre à jour le message sur Supabase (${res.status})`);
    }
    return true;
  } catch (err) {
    console.error("Erreur de mise à jour Supabase :", err);
    throw err;
  }
}

/**
 * Récupère toutes les adhésions/candidatures depuis la table 'adhesions' de Supabase
 */
export async function fetchCloudAdhesions(config) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/adhesions?select=*&order=id.desc`;
  
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    
    if (!res.ok) {
      throw new Error(`Erreur HTTP Supabase: ${res.status}`);
    }
    
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Erreur lors de la récupération des adhésions Supabase :", err);
    throw err;
  }
}

/**
 * Enregistre une demande d'adhésion dans la table 'adhesions' de Supabase
 */
export async function saveCloudAdhesion(config, adhesion) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/adhesions`;
  
  const payload = {
    last_name: adhesion.last_name || '',
    first_name: adhesion.first_name || '',
    email: adhesion.email || '',
    application_letter_name: adhesion.application_letter_name || '',
    application_letter_data: adhesion.application_letter_data || '',
    cv_name: adhesion.cv_name || '',
    cv_data: adhesion.cv_data || '',
    date: adhesion.date || new Date().toLocaleString('fr-FR'),
    status: 'En attente'
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Impossible d'enregistrer la demande sur Supabase (${res.status}): ${errText}`);
    }
    
    const data = await res.json();
    return data[0]?.id;
  } catch (err) {
    console.error("Erreur d'écriture de la demande Supabase :", err);
    throw err;
  }
}

/**
 * Supprime une demande d'adhésion dans Supabase
 */
export async function deleteCloudAdhesion(config, id) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/adhesions?id=eq.${id}`;
  
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    
    if (!res.ok) {
      throw new Error(`Impossible de supprimer la demande sur Supabase (${res.status})`);
    }
    return true;
  } catch (err) {
    console.error("Erreur de suppression de la demande Supabase :", err);
    throw err;
  }
}

/**
 * Met à jour le statut d'une demande d'adhésion dans Supabase
 */
export async function updateAdhesionStatus(config, id, status) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/adhesions?id=eq.${id}`;
  
  const payload = {
    status: status
  };

  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      throw new Error(`Impossible de mettre à jour le statut sur Supabase (${res.status})`);
    }
    return true;
  } catch (err) {
    console.error("Erreur de mise à jour du statut Supabase :", err);
    throw err;
  }
}

/**
 * Récupère tous les logs d'activité depuis Supabase
 */
export async function fetchCloudAuditLogs(config) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/audit_logs?select=*&order=created_at.desc`;
  
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    
    if (!res.ok) {
      throw new Error(`Erreur HTTP Supabase (logs): ${res.status}`);
    }
    
    return await res.json();
  } catch (err) {
    console.error("Erreur lors de la récupération des logs d'audit Supabase :", err);
    throw err;
  }
}

/**
 * Enregistre un log d'activité dans Supabase
 */
export async function saveCloudAuditLog(config, log) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/audit_logs`;
  
  const payload = {
    user_name: log.user_name || 'Anonyme',
    action: log.action || '',
    details: log.details || '',
    created_at: log.created_at || new Date().toISOString()
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Impossible d'enregistrer le log sur Supabase (${res.status}): ${errText}`);
    }
    
    const data = await res.json();
    return data[0]?.id;
  } catch (err) {
    console.error("Erreur d'écriture du log Supabase :", err);
    throw err;
  }
}

/**
 * Supprime les logs d'activité de plus de 30 jours dans Supabase
 */
export async function deleteOldCloudAuditLogs(config) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/audit_logs?created_at=lt.${thirtyDaysAgo}`;
  
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    
    if (!res.ok) {
      throw new Error(`Impossible de supprimer les anciens logs sur Supabase (${res.status})`);
    }
    return true;
  } catch (err) {
    console.error("Erreur de nettoyage des anciens logs Supabase :", err);
    throw err;
  }
}
