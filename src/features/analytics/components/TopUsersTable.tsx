import { Card, CardHeader, CardBody } from '@/components/organisms/Card';
import { Badge } from '@/components/atoms/Badge';
import { formatDuration } from '@/utils/formatters';
import type { TopUser } from '../types';

interface TopUsersTableProps {
  users: TopUser[];
  loading?: boolean;
}

export const TopUsersTable = ({ users, loading }: TopUsersTableProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Top Users</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 rounded bg-slate-200"></div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Top Users</h3>
        </CardHeader>
        <CardBody>
          <div className="flex h-40 items-center justify-center text-slate-500">
            No user data available
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Top Users</h3>
        <p className="text-sm text-slate-600">By calls and balance usage</p>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200">
              <tr>
                <th className="pb-3 text-left text-sm font-semibold text-slate-700">
                  Rank
                </th>
                <th className="pb-3 text-left text-sm font-semibold text-slate-700">
                  User
                </th>
                <th className="pb-3 text-right text-sm font-semibold text-slate-700">
                  Calls
                </th>
                <th className="pb-3 text-right text-sm font-semibold text-slate-700">
                  Duration
                </th>
                <th className="pb-3 text-right text-sm font-semibold text-slate-700">
                  Balance Used
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user, index) => (
                <tr key={user.inviter__user_id} className="hover:bg-slate-50">
                  <td className="py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="font-medium text-slate-900">
                      {user.inviter__email}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Badge variant="info" size="sm">
                      {user.call_count}
                    </Badge>
                  </td>
                  <td className="py-3 text-right text-sm text-slate-700">
                    {formatDuration(user.total_duration)}
                  </td>
                  <td className="py-3 text-right">
                    <span className="font-semibold text-indigo-600">
                      {user.total_cost} calls
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};
