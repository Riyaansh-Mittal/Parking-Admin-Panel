import { useState, useEffect } from 'react';
import { relationshipsService } from '@/api/services/relationships.service';
import type { RelationshipDetail } from '../types';

export const useRelationshipDetail = (relationshipId: string | undefined) => {
  const [relationship, setRelationship] = useState<RelationshipDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!relationshipId) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await relationshipsService.getRelationshipDetail(relationshipId);
        setRelationship(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch relationship detail');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [relationshipId]);

  return { relationship, loading, error };
};
