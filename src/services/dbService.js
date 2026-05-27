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

/**
 * Generic helper to fetch data from a table
 */
async function fetchTable(config, tableName, orderBy = 'id.asc') {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/${tableName}?select=*&order=${orderBy}`;
  
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  });
  
  if (!res.ok) {
    throw new Error(`Supabase fetch failed for ${tableName} (${res.status})`);
  }
  
  return await res.json();
}

/**
 * Generic helper to post a new record and return its ID
 */
async function postRecord(config, tableName, payload) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/${tableName}`;
  
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
    throw new Error(`Supabase post failed for ${tableName} (${res.status}): ${errText}`);
  }
  
  const data = await res.json();
  return data[0]?.id;
}

/**
 * Generic helper to patch a record
 */
async function patchRecord(config, tableName, id, payload) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/${tableName}?id=eq.${id}`;
  
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
    const errText = await res.text();
    throw new Error(`Supabase patch failed for ${tableName} ID ${id} (${res.status}): ${errText}`);
  }
  
  return true;
}

/**
 * Generic helper to delete a record
 */
async function deleteRecord(config, tableName, id) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/${tableName}?id=eq.${id}`;
  
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  });
  
  if (!res.ok) {
    throw new Error(`Supabase delete failed for ${tableName} ID ${id} (${res.status})`);
  }
  
  return true;
}

// Announcements CRUD
export async function fetchCloudAnnouncements(config) {
  return await fetchTable(config, 'announcements', 'id.asc');
}
export async function createCloudAnnouncement(config, item) {
  const payload = {
    title: item.title || '',
    theme: item.theme || '',
    text: item.text || '',
    fullText: item.fullText || '',
    date: item.date || '',
    image: item.image || ''
  };
  return await postRecord(config, 'announcements', payload);
}
export async function updateCloudAnnouncement(config, id, item) {
  const payload = {
    title: item.title || '',
    theme: item.theme || '',
    text: item.text || '',
    fullText: item.fullText || '',
    date: item.date || '',
    image: item.image || ''
  };
  return await patchRecord(config, 'announcements', id, payload);
}
export async function deleteCloudAnnouncement(config, id) {
  return await deleteRecord(config, 'announcements', id);
}

// Team Members CRUD
export async function fetchCloudTeam(config) {
  return await fetchTable(config, 'team_members', 'id.asc');
}
export async function createCloudTeamMember(config, member) {
  const payload = {
    name: member.name || '',
    role: member.role || '',
    image: member.image || ''
  };
  return await postRecord(config, 'team_members', payload);
}
export async function updateCloudTeamMember(config, id, member) {
  const payload = {
    name: member.name || '',
    role: member.role || '',
    image: member.image || ''
  };
  return await patchRecord(config, 'team_members', id, payload);
}
export async function deleteCloudTeamMember(config, id) {
  return await deleteRecord(config, 'team_members', id);
}

// Activities CRUD
export async function fetchCloudActivities(config) {
  return await fetchTable(config, 'activities', 'id.asc');
}
export async function createCloudActivity(config, activity) {
  const payload = {
    title: activity.title || '',
    description: activity.description || '',
    image: activity.image || ''
  };
  return await postRecord(config, 'activities', payload);
}
export async function updateCloudActivity(config, id, activity) {
  const payload = {
    title: activity.title || '',
    description: activity.description || '',
    image: activity.image || ''
  };
  return await patchRecord(config, 'activities', id, payload);
}
export async function deleteCloudActivity(config, id) {
  return await deleteRecord(config, 'activities', id);
}

// Gallery CRUD
export async function fetchCloudGallery(config) {
  return await fetchTable(config, 'gallery_photos', 'id.asc');
}
export async function createCloudGalleryPhoto(config, photo) {
  const payload = {
    url: photo.url || '',
    caption: photo.caption || ''
  };
  return await postRecord(config, 'gallery_photos', payload);
}
export async function deleteCloudGalleryPhoto(config, id) {
  return await deleteRecord(config, 'gallery_photos', id);
}

// Partners CRUD
export async function fetchCloudPartners(config) {
  return await fetchTable(config, 'partners', 'id.asc');
}
export async function createCloudPartner(config, partner) {
  const payload = {
    name: partner.name || '',
    logo: partner.logo || ''
  };
  return await postRecord(config, 'partners', payload);
}
export async function deleteCloudPartner(config, id) {
  return await deleteRecord(config, 'partners', id);
}

// Events CRUD
export async function fetchCloudEvents(config) {
  return await fetchTable(config, 'events', 'id.asc');
}
export async function createCloudEvent(config, event) {
  const payload = {
    title: event.title || '',
    date: event.date || '',
    description: event.description || '',
    fullText: event.fullText || '',
    image: event.image || '',
    videoUrl: event.videoUrl || '',
    subImages: event.subImages || [],
    activities: event.activities || [],
    downloads: event.downloads || []
  };
  return await postRecord(config, 'events', payload);
}
export async function updateCloudEvent(config, id, event) {
  const payload = {
    title: event.title || '',
    date: event.date || '',
    description: event.description || '',
    fullText: event.fullText || '',
    image: event.image || '',
    videoUrl: event.videoUrl || '',
    subImages: event.subImages || [],
    activities: event.activities || [],
    downloads: event.downloads || []
  };
  return await patchRecord(config, 'events', id, payload);
}
export async function deleteCloudEvent(config, id) {
  return await deleteRecord(config, 'events', id);
}

// Settings Key-Value (Contact & TickerText)
export async function fetchCloudSettings(config, key) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/site_settings?key=eq.${key}&select=value`;
  
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  });
  
  if (!res.ok) {
    throw new Error(`Supabase settings fetch failed for key ${key} (${res.status})`);
  }
  
  const data = await res.json();
  return data[0]?.value;
}

export async function saveCloudSettings(config, key, value) {
  const { supabaseUrl, supabaseAnonKey } = config;
  const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/site_settings`;
  
  const payload = {
    key: key,
    value: value
  };
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(payload)
  });
  
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Supabase settings save failed for key ${key} (${res.status}): ${errText}`);
  }
  
  return true;
}

